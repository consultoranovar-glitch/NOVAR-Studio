import zipfile, sys
from lxml import etree
W='{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
def loc(t): return t.split('}')[-1]
PPR=['pStyle','keepNext','keepLines','pageBreakBefore','framePr','widowControl','numPr','suppressLineNumbers','pBdr','shd','tabs','suppressAutoHyphens','kinsoku','wordWrap','overflowPunct','topLinePunct','autoSpaceDE','autoSpaceDN','bidi','adjustRightInd','snapToGrid','spacing','ind','contextualSpacing','mirrorIndents','suppressOverlap','jc','textDirection','textAlignment','textboxTightWrap','outlineLvl','divId','cnfStyle','rPr','sectPr','pPrChange']
TCPR=['cnfStyle','tcW','gridSpan','hMerge','vMerge','tcBorders','shd','noWrap','tcMar','textDirection','tcFit','vAlign','hideMark']
RPR=['rStyle','rFonts','b','bCs','i','iCs','caps','smallCaps','strike','dstrike','outline','shadow','emboss','imprint','noProof','snapToGrid','vanish','webHidden','color','spacing','w','kern','position','sz','szCs','highlight','u','effect','bdr','shd','fitText','vertAlign','rtl','cs','em','lang','eastAsianLayout','specVanish','oMath']
def check(name,order):
    bad=[]
    for parent in tree.iter(W+name):
        seen=[loc(c.tag) for c in parent]
        idx=[order.index(s) for s in seen if s in order]
        if idx!=sorted(idx): bad.append((name,seen))
    return bad
for f in sys.argv[1:]:
    z=zipfile.ZipFile(f); tree=etree.fromstring(z.read('word/document.xml'))
    errs=check('pPr',PPR)+check('tcPr',TCPR)+check('rPr',RPR)
    print(f, '✅ XML OK' if not errs else '❌ '+str(errs[:4]))
