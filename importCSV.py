import pandas as pd
from sqlalchemy import create_engine

# Thông tin kết nối MySQL
DB_USER = 'root'                
DB_PASSWORD = ''                
DB_HOST = 'localhost'           
DB_PORT = '3306'                
DB_NAME = 'medicine_db'         

csv_file_path = r'D:/Xampp/htdocs/csv/Cleaned_Medicine_Details.csv'

engine = create_engine(f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}')

df = pd.read_csv(csv_file_path)

df.rename(columns={
    'Medicine Name': 'medicine_name',
    'Composition': 'composition',
    'Uses': 'uses',
    'Side_effects': 'side_effects',
    'Image URL': 'image_url',
    'Manufacturer': 'manufacturer',
    'Excellent Review %': 'excellent_review_percent',
    'Average Review %': 'average_review_percent',
    'Poor Review %': 'poor_review_percent'
}, inplace=True)

df.to_sql('cleaned_medicine_details', con=engine, if_exists='append', index=False)

print("Dữ liệu đã được đẩy thành công vào MySQL!")
