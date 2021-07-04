onmessage = (event) =>{
    const imgData = event.data
    const data = imgData.data
    const len = data.length
    for(let i=0;i<len-4;i+=4) {
        if((i+1)%4!==0) {
            const avg = (data[i]+data[i+1]+data[i+2])/3
            data[i] = avg
            data[i+1] = avg
            data[i+2] = avg
        }
    }
    postMessage(imgData)
}