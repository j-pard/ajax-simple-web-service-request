(() => {

      const targets = [
            quoteTarget = document.getElementById("blockquote"),
            imgTarget = document.getElementById("img"),
            authorTarget = document.getElementById("author"),
            nQuotes = document.getElementById("nQuotes"),
            id = document.getElementById("id")
      ];

      const setContent = (target, value) => {
            target.textContent = value;
      }

      let httpRequest;

      const makeRequest = (url) => {
            httpRequest = new XMLHttpRequest();

            if(!httpRequest) {
                  console.log("Abandon:Impossible de créer une instance de XMLHTTP");
                  return false;
            }
            httpRequest.onreadystatechange = alertContents;
            httpRequest.open("GET", url, true);
            httpRequest.send();
      };

      const alertContents = () => {
            try {
                  if (httpRequest.readyState === XMLHttpRequest.DONE) {
                        if (httpRequest.status === 200) {
                              let quote = JSON.parse(httpRequest.response);

                              setContent(quoteTarget, quote.quote);
                              imgTarget.style.backgroundImage = `url(${quote.photo})`;
                              setContent(authorTarget, quote.author);
                              if (quote.total_quotes > 1) {
                                    setContent(nQuotes, `${quote.total_quotes} quotes`);
                              }
                              else {
                                    setContent(nQuotes, `${quote.total_quotes} quote`);
                              }
                              setContent(id, `#${quote.id}`);
                        }
                        else {
                              console.log("Il y a eu un problème avec la requête.")
                        }
                  }
            }
            catch (error) {
                  console.log("Une exception s'est produite : " + error.description);
            }            
      };

      makeRequest("https://thatsthespir.it/api");

      document.getElementById("again").addEventListener("click", () => {
            makeRequest("https://thatsthespir.it/api");
      });

      // const getQuote = async () => {
      //       let reponse = await fetch("https://thatsthespir.it/api");
      //       let data = await reponse.json();
      //       return data;
      // }

      // getQuote().then(quote => {
      //       console.log(quote);
            
      //       setContent(quoteTarget, quote.quote);
      //       imgTarget.setAttribute("src", quote.photo);
      //       console.log(quote.photo);
      //       setContent(authorTarget, quote.author);
      //       if (quote.total_quotes > 1) {
      //             setContent(nQuotes, `${quote.total_quotes} quotes`);
      //       }
      //       else {
      //             setContent(nQuotes, `${quote.total_quotes} quote`);
      //       }
      //       setContent(id, `#${quote.id}`);      
      // });
})();
