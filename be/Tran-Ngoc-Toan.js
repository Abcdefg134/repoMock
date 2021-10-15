// Họ và tên: Trần Ngọc Toàn
// Số điện thoại: 0984014241
// Email: toan1998vn1@gmail.com
// Vị trí ứng tuyển : Intern Nodejs

// 1. Chuyển ký tự đầu mỗi chữ thành in hoa

const toUpCase = (string) => {
    return string.split(' ').map(x => x[0].toUpperCase() + x.substr(1)).join()
}

// 2. Viết và xử lý ký tự đầu tiên lặp lại trong chuỗi

const filter = (str) => {
    const a = str.split('').filter((x, i) => str.indexOf(x) !== i)
    console.log(a)
    return a[0] ? a[0] : null
}

// 3. Tìm số thiếu

const search = (arr) => {
    const sumArr = arr.reduce((a, b) => a + b, 0)
    const sum10 = 55
    let x = sum10 - sumArr
    console.log(x);
    for (i = 1; i < 11; i++) {
        for (j = 2; j < 11; j++) {
            for (k = 3; k < 11; k++) {
                if (i !== j && i !== k && k !== j) {
                    let arr2 = [i, j, k]
                    if (arr2.reduce((a, b) => a + b, 0) == x && arr.includes(i) == false && arr.includes(j) == false && arr.includes(k) == false) {
                        return arr2
                    }
                }
            }
        }
    }
}

const test = (arr)=>{
    const arr2 = []
    for(i=1;i<11;i++){
        if(arr.includes(i) == false){
            arr2.push(i)
        }
    }
    return arr2
}

// 4. Tìm 2 số lớn nhất trong mảng

const search = (arr) => {
    const filter = arr.filter((item, index) => arr.indexOf(item) === index)
    if (filter.length == 1) {
        return [filter[0], null]
    } else {
        const sortArray = filter.sort((a, b) => a - b)
        return [sortArray[sortArray.length - 1], sortArray[sortArray.length - 2]]
    }
}

// 5.Tìm từ dài nhất

const search = (str) => {
    const arr = str.split(' ')
    const sortArray = arr.sort((a, b) => a.length - b.length)

    const check = arr.map(x => x.length)
    console.log(check);
    const filter = check.filter((item, index) => arr.indexOf(item) === index)
    console.log(filter);
    if (filter.length == 0) {
        return null
    } else {
        return sortArray[sortArray.length - 1]

    }
}

// EM xin cập nhật lại số điện thoại ạ