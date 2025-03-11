import pandas as pd
from sqlalchemy import create_engine

# Thông tin kết nối MySQL
DB_USER = 'root'
DB_PASSWORD = ''
DB_HOST = 'localhost'
DB_PORT = '3306'
DB_NAME = 'medicine_db'

csv_file_path = r'D:/Xampp/htdocs/csv/Cleaned_disease.csv'

engine = create_engine(f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}', 
                       pool_recycle=1800, pool_size=10, echo=True)

df = pd.read_csv(csv_file_path)

df.rename(columns={
    'Ten_benh': 'ten_benh',
    'Dinh_nghia': 'dinh_nghia',
    'Nguyen_nhan': 'nguyen_nhan',
    'Trieu_chung': 'trieu_chung',
    'Chan_doan': 'chan_doan',
    'Dieu_tri': 'dieu_tri',
}, inplace=True)

# Chia nhỏ file CSV để tránh lỗi
chunk_size = 1000  # Số dòng mỗi lần insert
for chunk in pd.read_csv(csv_file_path, chunksize=chunk_size):
    chunk.to_sql('cleaned_disease', con=engine, if_exists='append', index=False, method='multi')

print("Dữ liệu đã được đẩy thành công vào MySQL!")
