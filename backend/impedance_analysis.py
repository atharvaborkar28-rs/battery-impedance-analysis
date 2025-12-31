import pandas as pd
import numpy as np


def read_impedance_csv(file_path: str):
    df = pd.read_csv(file_path)

    freq = df.iloc[:, 0].values
    z_real = df.iloc[:, 1].values
    z_imag = df.iloc[:, 2].values

    Z = z_real + 1j * z_imag
    return freq, Z


def compute_bode_data(freq, Z):
    magnitude = np.abs(Z)
    phase = np.angle(Z, deg=True)

    return magnitude, phase
def compute_circuit_parameters(Z):
    z_real = Z.real

    Rb = z_real.min()
    Rct = z_real.max() - z_real.min()

    return Rb, Rct

