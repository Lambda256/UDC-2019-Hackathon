def getNumAndName(row):
    cols = row.split("\",\"")
    return cols[2] + ". " + cols[3]

if __name__ == "__main__":
    # open files
    log = open("stations.csv", "r")
    log_read = log.read()
    rows = log_read.split("\n")
    names = []
    for i, x in enumerate(rows):
        # labels
        if i == 0:
            continue
        names.append(getNumAndName(x))
    print(names)
