import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

// Sample comes from: https://mozilla.github.io/pdf.js/examples/index.html#interactive-examples

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

const PDFViewer2 = ({ url }) => {
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [pageRendering, setPageRendering] = useState(false);
  const [pageNumPending, setPageNumPending] = useState(null);
  const scale = 0.8;

  useEffect(() => {
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then((pdf) => {
      setPdfDoc(pdf);
      document.getElementById('page_count').textContent = pdf.numPages;
      renderPage(pageNum);
    });
  }, [url, pageNum]);

  const renderPage = (num) => {
    setPageRendering(true);
    console.log("renderPage, Start to pdfDoc.getPage, setPageRendering --> true");
    
    pdfDoc.getPage(num).then((page) => {
      const viewport = page.getViewport({ scale: scale });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      const renderTask = page.render(renderContext);

      renderTask.promise.then(() => {
        console.log("page.render done. setPageRendering --> false");
        setPageRendering(false);
        if (pageNumPending !== null) {
            console.log(`start to renderPage: ${pageNumPending}`);
          renderPage(pageNumPending);
          setPageNumPending(null);
        }
      });
    });
    document.getElementById('page_num').textContent = num;
  };

  const queueRenderPage = (num) => {
    console.log(`queueRenderPage: ${num}`);
    if (pageRendering) {
      setPageNumPending(num);
    } else {
      renderPage(num);
    }
  };

  const onPrevPage = () => {
    if (pageNum <= 1) {
      return;
    }
    console.log(`onPrevPage: current: ${pageNum}`);
    setPageNum(pageNum - 1);
    queueRenderPage(pageNum - 1);
  };

  const onNextPage = () => {
    if (pageNum >= pdfDoc.numPages) {
      return;
    }
    console.log(`onNextPage: current: ${pageNum}`);
    setPageNum(pageNum + 1);
    queueRenderPage(pageNum + 1);
  };

  return (
    <div>
      <h1>PDF.js Previous/Next example</h1>
      <p>Please use <a href="https://mozilla.github.io/pdf.js/getting_started/#download"><i>official releases</i></a> in production environments.</p>
      <div>
        <button id="prev" onClick={onPrevPage}>Previous</button>
        <button id="next" onClick={onNextPage}>Next</button>
        &nbsp; &nbsp;
        <span>Page: <span id="page_num"></span> / <span id="page_count"></span></span>
      </div>
      <canvas id="the-canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default PDFViewer2;
