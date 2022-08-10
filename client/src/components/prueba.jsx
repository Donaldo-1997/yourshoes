import React, { useState } from "react";


export default function CreatePrueba() {

let array = []
const[size35, setSize35] = useState({
    number:35,
    stock:0
})
const[size36, setSize36] = useState({
    number:36,
    stock:0
})
const[size37, setSize37] = useState({
    number:37,
    stock:0
})
const[size38, setSize38] = useState({
    number:38,
    stock:0
})
const[size39, setSize39] = useState({
    number:39,
    stock:0
})
const[size40, setSize40] = useState({
    number:40,
    stock:0
})
const[size41, setSize41] = useState({
    number:41,
    stock:0
})
const[size42, setSize42] = useState({
    number:42,
    stock:0
})
const[size43, setSize43] = useState({
    number:43,
    stock:0
})

const handleOnChange = (e)=>{
e.preventDefault()
setSize35({ 
    ...size35,
    stock:e.target.value
})
}
const handleOnChange1 = (e)=>{
    e.preventDefault()
setSize36({
    ...size36,
    stock: e.target.value
})
}
const handleOnChange2 = (e)=>{
    e.preventDefault()
setSize37({
    ...size37,
    stock: e.target.value
})
}
const handleOnChange3 = (e)=>{
    e.preventDefault()
setSize38({
    ...size38,
    stock: e.target.value
})
}
const handleOnChange4 = (e)=>{
    e.preventDefault()
setSize39({
    ...size39,
    stock: e.target.value
})
}
const handleOnChange5 = (e)=>{
    e.preventDefault()
setSize40({
    ...size40,
    stock: e.target.value
})
}
const handleOnChange6 = (e)=>{
    e.preventDefault()
setSize41({
    ...size41,
    stock: e.target.value
})
}
const handleOnChange7 = (e)=>{
    e.preventDefault()
setSize42({
    ...size42,
    stock: e.target.value
})
}
const handleOnChange8 = (e)=>{
    e.preventDefault()
setSize43({
    ...size43,
    stock: e.target.value
})
}
array.push(size35,size36,size37,size38,size39,size40,size41,size42,size43)
console.log(array)
return(
    <div>
        <div>
        <form>

        <label>35</label>
        <input onChange={(e)=>{handleOnChange(e)}}
        placeholder="ingresa el stock..."
        type='number'
        value={size35.stock}/>

        <label>36</label>
        <input onChange={(e)=>{handleOnChange1(e)}}
        placeholder="ingresa el stock..."
        value={size36.stock}/>

        <label>37</label>
        <input onChange={(e)=>{handleOnChange2(e)}}
        placeholder="ingresa el stock..."
        value={size37.stock}/>

        <label>38</label>
        <input onChange={(e)=>{handleOnChange3(e)}}
        placeholder="ingresa el stock..."
        value={size38.stock}/>

        <label>39</label>
        <input onChange={(e)=>{handleOnChange4(e)}}
        placeholder="ingresa el stock..."
        value={size39.stock}/>

        <label>40</label>
        <input onChange={(e)=>{handleOnChange5(e)}}
        placeholder="ingresa el stock..."
        value={size40.stock}/>

        <label>41</label>
        <input onChange={(e)=>{handleOnChange6(e)}}
        placeholder="ingresa el stock..."
        value={size41.stock}/>

        <label>42</label>
        <input onChange={(e)=>{handleOnChange7(e)}}
        placeholder="ingresa el stock..."
        value={size42.stock}/>

        <label>43</label>
        <input onChange={(e)=>{handleOnChange8(e)}}
        placeholder="ingresa el stock..."
        value={size43.stock}/>
        </form>
    </div>
    </div>
)


}