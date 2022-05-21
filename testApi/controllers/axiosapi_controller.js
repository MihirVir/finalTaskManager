const axios  = require('axios');



const apiThing = (req, res) => {
    let arr = []
    const newUrl =  `https://jsonmock.hackerrank.com/api/articles?page=1`;
    axios.get(newUrl)
    .then((result) => {
        
        const ans = result.data.data.sort((a, b) => b.num_comments - a.num_comments)
        for (let j = 0; j < req.body.limit; j++) {
            
            if (ans[j].title === null && ans[j].story_title === null) {
                j++;
            } else if (ans[j].title !== null || ans[j].story_title !== null) {
                arr[j] = ans[j];
            }
        }
        for (let k = 0; k < req.body.limit; k++) {
            console.log(arr[k]);
            if (k  = req.body.limit - 1) {
                return res.status(200).json(arr);
            }
        }
    }).catch((err) => {
        console.log(err);
    })
   
    
    
    console.log(arr)
}


module.exports = {apiThing}