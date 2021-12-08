export default class CommonServices {
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
  getCallAjax(url) {
    return new Promise((resolve, reject) => {
      var xhr;
      // compatible with IE7+, Firefox, Chrome, Opera, Safari
      xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          resolve(JSON.parse(xhr.responseText));
        } else reject(console.log(xhr.responseText));
      };
      xhr.onerror = () => {
        reject("Request failed");
      };
      // xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
      // xmlhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
      // xmlhttp.setRequestHeader('Content-Type', 'application/xml');
      xhr.send();
    });
  }

  postCallAjax(url, data) {
    return new Promise((resolve, reject) => {
      var xhr;
      // compatible with IE7+, Firefox, Chrome, Opera, Safari
      xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          resolve(JSON.parse(xhr.responseText));
        } else reject(console.log(xhr.responseText));
      };
      xhr.onerror = () => {
        reject("Request failed");
      };
      xhr.send(JSON.stringify(data));
    });
  }

  putCallAjax(url, data) {
    return new Promise((resolve, reject) => {
      var xhr;
      // compatible with IE7+, Firefox, Chrome, Opera, Safari
      xhr = new XMLHttpRequest();
      xhr.open("PUT", url);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          resolve(JSON.parse(xhr.responseText));
        } else reject(console.log(xhr.responseText));
      };
      xhr.onerror = () => {
        reject("Request failed");
      };
      xhr.send(JSON.stringify(data));
    });
  }
}
