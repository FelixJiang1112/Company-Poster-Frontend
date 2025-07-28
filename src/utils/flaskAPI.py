from pickle import APPEND
from sqlite3 import Cursor
from flask import Flask, jsonify
import pymysql
from flask_cors import CORS
import os
import json
from dotenv import load_dotenv

load_dotenv()

with open('./src/assets/data/english_to_chinese.json', 'r', encoding='utf-8') as f:
    EN_TO_CN_MAPPING = json.load(f)

def translate_english_to_chinese(english_text):
    return EN_TO_CN_MAPPING.get(english_text)

app = Flask(__name__)
CORS(app)

print(os.getenv('DB_NAME'))

db = pymysql.connect(
    host=os.getenv('DB_HOST'),
    port=int(os.getenv('DB_PORT')),
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD'),
    database=os.getenv('DB_DATABASE'),
    charset=os.getenv('DB_CHARSET')
)

@app.route('/api/data')
def get_data():
    cursor = db.cursor()
    cursor.execute("use goodland;")
    cursor.execute("select * from poster limit 2;")
    # row = cursor.fetchone()
    data = cursor.fetchall()
    result = []
    for row in data:
        result.append({
            'id': row[0],
            'mortgageType': row[1],
            'suburb': row[2],
            'state': row[3],
            'postcode': row[4],
            # 'interest_rate': row[4],
            'loan_nature': {
                'en': row[5],
                'cn': translate_english_to_chinese(row[5])
            },
            'loan_purpose': {
                'en': row[6],
                'cn': translate_english_to_chinese(row[6])
            },
            # 'loan_purpose': '计划搬迁至昆州购买新的住房 ',
            'exit_strategy': {
                'en': row[7],
                'cn': translate_english_to_chinese(row[7])
            },
            # 'exit_strategy': '转贷至银行或其他金融机构',
            'loan_start_date': row[8],
            'loan_repayment_date': row[9],
            'loan_term': f"{row[10]} 个月",
            'minimum_investment': row[11],
            'loan_amount': f'${float(row[12]):,.1f}' if row[12] is not None else None,
            'security_value': f'${float(row[13]):,.1f}' if row[13] is not None else None,
            'lvr_ration': f'{float(row[14]):,.1f}%' if row[14] is not None else None,
            'property_info': {
                'cn': row[15],
                'en': row[16]
            },
            # 'info_cn': row[15],
            # 'info_en': row[16],
            'interest_rate': f'{float(row[17]*100):.1f}%' if row[17] is not None else None,
            'detail_img': row[18],
            # 'mortgage_amount': row[19],
        })
    # print(data)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)