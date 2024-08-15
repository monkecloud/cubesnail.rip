txtFile = open("sets.txt", "r")
jsonFile = open("sets.json","w")

#OPEN THE GATES
jsonFile.write('{"archive": [\n')
currentDate = ""
newClimb=True
for set in txtFile:
    setArray = set.split()
        #New set
    if setArray[0] != currentDate:
        newClimb=True
        #close the old set if not the first one
        if currentDate != "":
            #close the climb array, and set
            jsonFile.write("]},\n")
        currentDate = setArray[0]
        jsonFile.write("  {\n")
        jsonFile.write('  "date": "'+setArray[0]+'",\n')
        jsonFile.write('  "area": "'+setArray[2]+'",\n')
        jsonFile.write('  "resetbackfill": "'+setArray[3]+'",\n')
        jsonFile.write('  "climbs": [\n')
    #new climb
    #don't add comma if first in the list
    if newClimb:
        newClimb = False
    else:
        jsonFile.write(',')

    jsonFile.write('    {\n')
    jsonFile.write('    "color":"'+setArray[1]+'",\n')
    jsonFile.write('    "actualgrade":"'+setArray[4]+'",\n')
    jsonFile.write('    "intendedgrade":"'+setArray[5]+'",\n')
    jsonFile.write('    "setter":"'+setArray[6]+'",\n')
    jsonFile.write('    "ric":{\n')
    if len(setArray) > 7:
        jsonFile.write('      "risk":'+setArray[7]+',\n')
        jsonFile.write('      "intensity":'+setArray[8]+',\n')
        jsonFile.write('      "complexity":'+setArray[9]+'\n')
    jsonFile.write('      }\n')
    jsonFile.write('    }\n')

#CLOSE THE GATES
jsonFile.write("]}]}")
txtFile.close()
jsonFile.close()

'''
xmlFile = open("sets.xml", "w")

xmlFile.write('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n')
xmlFile.write("<archive>\n")


currentdate = ""
for set in txtFile:
    setArray = set.split()
    if setArray[0] != currentdate:
        
        if currentdate != "":
            xmlFile.write("  </set>\n")
        currentdate = setArray[0]
        xmlFile.write("  <set>\n")
        xmlFile.write('    <date>'+setArray[0]+'</date>\n')
        xmlFile.write('    <area>'+setArray[2]+'</area>\n')
        xmlFile.write('    <resetbackfill>'+setArray[3]+'</resetbackfill>\n')
    xmlFile.write('    <climb>\n')
    xmlFile.write('      <color>'+setArray[1]+'</color>\n')
    xmlFile.write('      <actualgrade>'+setArray[4]+'</actualgrade>\n')
    xmlFile.write('      <intendedgrade>'+setArray[5]+'</intendedgrade>\n')


    if len(set) == 9:
        xmlFile.write('      <risk>'+setArray[6]+'</risk>\n')
        xmlFile.write('      <intensity>'+setArray[7]+'</intensity>\n')
        xmlFile.write('      <complexity>'+setArray[8]+'</complexity>\n')
    else:
        xmlFile.write('      <risk>?</risk>\n')
        xmlFile.write('      <intensity>?</intensity>\n')
        xmlFile.write('      <complexity>?</complexity>\n')
    xmlFile.write('    </climb>\n')
xmlFile.write(" </set>\n")
xmlFile.write("</archive>")


txtFile.close()
xmlFile.close()
'''