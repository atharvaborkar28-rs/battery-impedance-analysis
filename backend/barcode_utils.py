import random
import barcode
from barcode.writer import ImageWriter


def generate_cell_id():
    return random.randint(1000000000, 9999999999)


def generate_barcode(cell_id: int):
    CODE128 = barcode.get_barcode_class("code128")
    barcode_instance = CODE128(str(cell_id), writer=ImageWriter())

    file_path = f"barcode_{cell_id}"
    barcode_instance.save(file_path)

    return f"{file_path}.png"
