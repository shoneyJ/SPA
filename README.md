# Single Page application using vanilla javascript, node js express

---

Using this [Referrence](https://dev.to/dcodeyt/building-a-single-page-app-without-frameworks-hl9 "Dev To") I am developing a single page application without using a view engine.


The concepts I will be covering in it will be

1. RESTfull api using node js express.
2. Use of vanilla java script.
3. ES6 (promise,async)
4. Java script multi- threaded Event loop

```html
<h1>%name%</h1>
```

Read html file

```Javascript
  readHtml(file) {
    return new Promise((resolve, reject) => {
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        var xhr = new XMLHttpRequest();
        xhr.open("GET", file, true);
        xhr.onload = () => {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              resolve(xhr.responseText);
            }
          } else reject(console.log(xhr.responseText));
        };
        xhr.onerror = () => {
          reject("Request failed");
        };
        xhr.send();
      }
    });
  }
```

load html in DOM once data and external html files are modified

```Javascript
async loadHtml() {
    return await Promise.all([this.dataPromise, this.htmlPromise]).then(
      ([data, html]) => {
        for (const [key, value] of Object.entries(data[0])) {
          html = html.replaceAll(`%${key}%`, value);
        }
        document.querySelector("#app").innerHTML = html;
      }
    );
  }
```
