export async function Credit (amount, token) {
    let response = await fetch('http://localhost:2003/app/deposit', {
        method : 'post',
        body : JSON.stringify({amount : Number(amount)}),
        headers : { 'authorization' : `Bearer ${token}` }
    }).then(res => res.json()).catch(err => {console.log(err)})
    console.log(response)

    if (!response) return false
    else return response
}

export async function Debit (amount, token) {
    let response = await fetch('http://localhost:2003/app/debit', {
        method : 'post',
        body : JSON.stringify({amount : Number(amount)}),
        headers : { 'authorization' : `Bearer ${token}` }
    }).then(res => res.json()).catch(err => {console.log(err)})
    console.log(response)

    if (!response) return false
    else return response
}