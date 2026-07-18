# Guía · Documentos Word (python-docx sin corromper archivos)

> Word es ESTRICTO con el orden de los hijos XML. Un elemento fuera de orden = "Word detectó
> un error" y el cliente no puede abrir el archivo. Estas reglas salen de errores reales ya pagados.

## 1. Flujo

1. Escribir el contenido en Markdown (fuente de verdad, fácil de iterar con Pau).
2. Convertir: `python3 motor/documentos/md2docx.py doc.md doc.docx [--tokens marcas/<cliente>/design-tokens.json]`
3. **Validar SIEMPRE**: `python3 motor/documentos/validar_ooxml.py doc.docx` → debe imprimir "✅ XML OK".
4. QA visual si el documento es entregable final.

## 2. Reglas OOXML aprendidas (por qué existe el validador)

- **`w:pPr`** (propiedades de párrafo): orden obligatorio `pStyle < pBdr < shd < tabs < spacing < ind < jc`.
  Un `pBdr` insertado antes de `pStyle` corrompe el archivo → insertar en posición correcta, no `append`.
- **`w:tcPr`** (propiedades de celda): `tcW < tcBorders < shd < tcMar`. El clásico: llamar "sombrear celda"
  después de "poner márgenes" deja `shd` tras `tcMar` → corrupto. Las funciones del motor insertan
  cada hijo en su posición según el esquema, sin importar el orden de llamada.
- **`w:rPr`**: `rFonts` debe ir PRIMERO. No agregar `rFonts` a mano — usar `run.font.name`.
- **`fldSimple`** (número de página): su contenido debe ir envuelto en un `w:r`.
- LibreOffice NO es confiable en este entorno para validar/renderizar — usar el validador + Word real.

## 3. Estilo editorial NOVAR (validado por Pau)

- Títulos **Georgia** (título 22pt, sección 15pt navy, subsección 12.5pt dorado oscuro);
  cuerpo **Arial 10.5pt**, interlineado 1.25-1.32 (aire, sin apiñar).
- Encabezado: logo NOVAR dorado centrado. Footer: línea dorada superior +
  `novarchile.com  ·  [ícono in dorado] novarconsultores · página` (paginación real con campo PAGE).
- Referencias "a prueba de errores": siempre `archivo · página · sección`, y una sección final
  "Archivos de referencia" con tabla de qué contiene cada archivo y dónde se usa.
- Colores del sello: dorado `C9A84C`, dorado oscuro `A07F33`, tinta `1A1A1A`, gris `6E6E6E`,
  crema `F5EFD8` / `FBF8EE` (cajas).
