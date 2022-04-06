import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

class Plotting(object):
    def plot_satellite(self, year, location_name):
        df = pd.read_csv ('temperature/'+location_name+'_weekly.csv')
        plt.title("2-meter air temperature - "+location_name+" - "+str(year))
        plt.xlabel("Week")
        plt.ylabel("K (unit)")
        result = df[df['Year'] == year]
        plt.bar(result['Week'], result['temperature'], color="blue")
        #plt.show()
        plt.savefig("test.png")
        print("Saved plot")