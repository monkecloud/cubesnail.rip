txtFile = open("sets.txt", "r")
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