import pandas as pd
from sqlalchemy import create_engine

# Thông tin kết nối MySQL
DB_USER = 'root'                
DB_PASSWORD = ''                
DB_HOST = 'localhost'           
DB_PORT = '3306'                
DB_NAME = 'medicine_db'         

csv_file_path = r'D:/Xampp/htdocs/csv/Cleaned_Medicine.csv'

engine = create_engine(f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}')

df = pd.read_csv(csv_file_path)

df.rename(columns={
    'Medicine Name' : 'ten_thuoc',
    'Composition' : 'thanh_phan',
    'Uses' : 'cong_dung',
    'Side_effects' : 'tac_dung_phu',
    'Image URL' : 'hinh_anh',
    'Manufacturer' : 'nha_san_xuat',
    'Excellent Review %' : 'danh_gia_tot',
    'Average Review %' : 'danh_gia_trung_binh',
    'Poor Review %' : 'danh_gia_kem',
}, inplace=True)

df.to_sql('cleaned_medicine', con=engine, if_exists='append', index=False, chunksize=1000, method='multi')

print("Dữ liệu đã được đẩy thành công vào MySQL!")
