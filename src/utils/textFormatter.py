import re
import json

def handle_special_fields(data):
    """
    处理特定字段的空值，如果为空则设置为null
    
    Args:
        data (dict): JSON数据
        
    Returns:
        dict: 处理后的JSON数据
    """
    if not isinstance(data, dict):
        return data
        
    # 需要检查空值的特定字段路径
    special_fields = [
        ('financialMetrics', 'loanAmount', 'note'),
        ('financialMetrics', 'propertyValue', 'potentialValue'),
        ('financialMetrics', 'lvrRatio', 'potential')
    ]
    
    for path in special_fields:
        try:
            # 逐层检查字段是否存在
            temp = data
            for key in path[:-1]:
                if key not in temp:
                    break
                temp = temp[key]
            
            # 检查最后一个字段
            last_key = path[-1]
            if last_key in temp:
                # 如果值为空字符串、None或只包含空白字符，设置为null
                if not temp[last_key] or (isinstance(temp[last_key], str) and not temp[last_key].strip()):
                    temp[last_key] = None
        except Exception:
            continue
            
    return data

def format_text_spacing(text):
    """
    在中文与英文、数字之间添加空格
    
    Args:
        text (str): 输入的文本
        
    Returns:
        str: 格式化后的文本
    
    Examples:
        >>> format_text_spacing("位于悉尼CBD区域25公里")
        '位于悉尼 CBD 区域 25 公里'
        
        >>> format_text_spacing("Guildford区域123万")
        'Guildford 区域 123 万'
    """
    if not isinstance(text, str):
        return text
        
    # 匹配英文单词、数字（包括小数）的正则表达式
    pattern = r'([\u4e00-\u9fff])([a-zA-Z0-9.]+)|([a-zA-Z0-9.]+)([\u4e00-\u9fff])'
    
    # 在中英文、中数字之间添加空格
    text = re.sub(pattern, r'\1 \2\3 \4', text)
    
    # 处理可能出现的多余空格
    text = re.sub(r'\s+', ' ', text)
    
    return text.strip()

def format_json_text(json_data):
    """
    处理JSON数据中的所有文本，在中文与英文、数字之间添加空格
    
    Args:
        json_data: JSON数据（可以是字典、列表或基本类型）
        
    Returns:
        格式化后的JSON数据
    """
    if isinstance(json_data, dict):
        # 先处理特定字段的空值
        json_data = handle_special_fields(json_data)
        return {k: format_json_text(v) for k, v in json_data.items()}
    elif isinstance(json_data, list):
        return [format_json_text(item) for item in json_data]
    elif isinstance(json_data, str):
        return format_text_spacing(json_data)
    else:
        return json_data

def process_json_file(input_file, output_file=None):
    """
    处理JSON文件，格式化其中的文本
    
    Args:
        input_file (str): 输入JSON文件路径
        output_file (str, optional): 输出JSON文件路径，默认覆盖输入文件
        
    Returns:
        dict: 格式化后的JSON数据
    """
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        formatted_data = format_json_text(data)
        
        if output_file:
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(formatted_data, f, ensure_ascii=False, indent=2)
        else:
            with open(input_file, 'w', encoding='utf-8') as f:
                json.dump(formatted_data, f, ensure_ascii=False, indent=2)
                
        return formatted_data
    except Exception as e:
        print(f"处理文件时出错: {str(e)}")
        return None

# 使用示例
if __name__ == "__main__":
    # 示例1：处理单个文本
    text = "位于悉尼CBD区域25公里，Guildford区域123万"
    print(format_text_spacing(text))
    
    # 示例2：处理JSON数据
    sample_json = {
        "description": "位于悉尼CBD区域25公里",
        "location": "Guildford区域",
        "details": ["面积123平方米", "建于1955年"],
        "financialMetrics": {
            "loanAmount": {
                "note": ""  # 将被设置为null
            },
            "propertyValue": {
                "potentialValue": "  "  # 将被设置为null
            },
            "lvrRatio": {
                "potential": None  # 已经是null
            }
        }
    }
    formatted_json = format_json_text(sample_json)
    print(json.dumps(formatted_json, ensure_ascii=False, indent=2)) 