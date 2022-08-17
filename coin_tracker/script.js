
function addCommas(num) {
    if (typeof num !== "number")   parseInt(num);
    let numParts = num.toString().split(".");
    numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return numParts.join(".");
  }

function getCryptoJSON(){
    let xhr = new XMLHttpRequest();
    xhr.open("GET","https://api.coinlore.net/api/tickers/");
    xhr.addEventListener('readystatechange', ()=>{
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
            var response = JSON.parse(xhr.responseText);
            console.log(response);

            let table = document.querySelector('table');
            for (let coin of response.data){
                let tr = document.createElement('tr');

                let rank = document.createElement("td");
                rank.textContent = coin.rank;
                tr.appendChild(rank);
                
                let name = document.createElement("td");
                name.textContent = coin.name  + " " + coin.symbol;
                tr.appendChild(name);

                let price = document.createElement("td")
                price.textContent = "$ " + addCommas(coin.price_usd)
                tr.appendChild(price);

                let percent1 = document.createElement("td")
                if ( 0 <= coin.percent_change_1h) {
                    percent1.style.color = 'green';
                    percent1.textContent = "▲" + coin.percent_change_1h  
                  } else if ( 0>coin.percent_change_1h) {
                    percent1.style.color = 'red';
                    percent1.textContent = "▼" + coin.percent_change_1h
                  }
                // percent1.textContent = "▲" + coin.percent_change_1h
                tr.appendChild(percent1);

                let percent24  = document.createElement("td")
                if ( 0 <= coin.percent_change_24h) {
                    percent24.style.color = 'green';
                    percent24.textContent = "▲" + coin.percent_change_24h  
                  } else if ( 0 > coin.percent_change_24h) {
                    percent24.style.color = 'red';
                    percent24.textContent = "▼" + coin.percent_change_24h
                  }
                // percent24.textContent = coin.percent_change_24h
                tr.appendChild(percent24);

                let percent7d = document.createElement("td")
                if ( 0 <= coin.percent_change_7d) {
                    percent7d.style.color = 'green';
                    percent7d.textContent = "▲" + coin.percent_change_7d  
                  } else if ( 0 > coin.percent_change_7d) {
                    percent7d.style.color = 'red';
                    percent7d.textContent = "▼" + coin.percent_change_7d
                  }
                // percent7d.textContent = coin.percent_change_7d
                tr.appendChild(percent7d);

                let cap = document.createElement("td")
                cap.textContent = "$ " + addCommas(coin.market_cap_usd)
                tr.appendChild(cap);

                let volume = document.createElement("td")
                volume.textContent = "$ " + addCommas(coin.volume24)
                tr.appendChild(volume);

                let cSupply = document.createElement("td")
                cSupply.textContent = addCommas(coin.csupply) + " " + coin.symbol
                tr.appendChild(cSupply);
                
                // let symbol = document.createElement('td')
                // symbol.textContent = coin.symbol;
                // tr.appendChild(symbol);

                table.appendChild(tr);
            }
        }
    });
    xhr.send(null);
}
getCryptoJSON()

