import matplotlib.pyplot as plt
import pyart
import gzip

def plot_radar():
    # extract gzip file and open the file, create the displays and figure
    filename = gzip.open("KTLX19910605_162725.gz")
    radar = pyart.io.read_nexrad_archive(filename)
    display = pyart.graph.RadarDisplay(radar)
    fig = plt.figure(figsize=(6, 5))

    # plot super resolution reflectivity
    ax = fig.add_subplot(111)
    display.plot('reflectivity', 0, title='NEXRAD Reflectivity',
                vmin=-32, vmax=64, colorbar_label='', ax=ax)
    display.plot_range_ring(radar.range['data'][-1]/1000., ax=ax)
    display.set_limits(xlim=(-500, 500), ylim=(-500, 500), ax=ax)
    plt.show()

plot_radar()