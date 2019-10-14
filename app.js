const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello Express, my old friend!');
});

app.listen(8000, () => {
    console.log("Express server is listening on port 8000!");
});

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheeseburgers!');
});

app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza in on the way!');
});

app.get('/pizza/pineapple', (req, res) => {
    res.send("We don't serve that here. Never call again!");
});

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
        Base URL: ${req.baseUrl}
        Host: ${req.hostname}
        Path: ${req.path}
        App: ${req.app}
        Body: ${req.body}
        Cookies: ${req.cookies}
        Fresh: ${req.fresh}
        IP: ${req.ip}
        IPS: ${req.ips}
        Method: ${req.method}
        Original URL: ${req.originalUrl}
        Params: ${req.params}
        Protocol: ${req.protocol}
        Query: ${req.query}
        Route: ${req.route}
        Secure: ${req.secure}
        Signed Cookies: ${req.signedCookies}
        Stale: ${req.stale}
        Subdomains: ${req.subdomains}
        XHR: ${req.xhr}
        `;
    res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end();
});

app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name;
    const race = req.query.race;
  
    //2. validate the values
    if(!name) {
      //3. name was not provided
      return res.status(400).send('Please provide a name');
    }
  
    if(!race) {
      //3. race was not provided
      return res.status(400).send('Please provide a race');
    }
  
    //4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;
  
    //6. send the response 
    res.send(greeting);
});

app.get('/sum', (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    if(!a) {
        return res.status(400).send('Please provide value for a');
    }

    if(!b) {
        return res.status(400).send('Please provide value for b');
    }

    const sum = a + b;

    res.send(`The sum of ${a} and ${b} is ${sum}.`);
});

app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = req.query.shift;
    
    if(!text) {
        return res.status(400).send('Please provide value for text');
    }

    if(!shift) {
        return res.status(400).send('Please provide value for shift');
    }

    function cipher(text, shift) {
        let arr = text.split('');
        return arr.map(letter => {
            let newCode = letter.charCodeAt() + Number(shift);
            return String.fromCharCode(newCode);
        }).join('');
    }

    res.send(cipher(text,shift));
})

app.get('/lotto', (req, res) => {
    const numbers = req.query.numbers;

    if(numbers.length !== 6) {
        return res.status(400).send('Please provide 6 numbers');
    }

    numbers.forEach((number) => {
        if(number<1||number>20) {
            return res.status(400).send('Numbers can only be between 1 and 20');
        }
    })

    function lotto() {
        let numArr = [];
        while(numArr.length < 6) {
            let num = Math.ceil(Math.random()*20);
            if(numArr.indexOf(num)===-1) numArr.push(num);
        };
        return numArr;
    };

    function compare(arr1,arr2) {
        let count = 0;
        arr1.forEach(item => {
            if(arr2.indexOf(item) !== -1) {
                count++;
            }
        });
        if (count < 4) {
            return 'Sorry, you lose';
        } else if (count === 4) {
            return 'Congratulations, you win a free ticket';
        } else if (count === 5) {
            return 'Congratulations! You win $100!';
        } else {
            return 'Wow! Unbelievable! You could have won the mega millions!'
        };
    };

    res.send(`${compare(numbers, lotto())}, the winning numbers are: ${lotto()}`);
})