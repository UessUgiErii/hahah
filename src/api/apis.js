import axios from 'axios'
//服务器IP地址
export const IP = 'http://localhost:3000'
var ax = axios.create({
    baseURL: IP
})

export function login(acc, pwd) {
    return ax.post('/login', { acc, pwd })
}
export function addAccount(account, password, userGroup) {
    return ax.post('/main/addAccount', { account, password, userGroup })
}

export function EditPassword(id, newPwd, password) {
    return ax.post('/main/EditPassword', { id, newPwd, password })
}

export function getToken(token) {
    return ax.get('/checkToken', { params: { token } })
}
export function getAccounts(curpage, row) {
    return ax.get('/main/accountManage', { params: { curpage, row } })
}
export function removeAccount(id) {
    return ax.get('/main/accountRemove', { params: { id } })
}
//添加商品
export function addCommodity(category, barCode, name, salePrice, marketPrice, stockPrice, stockCount, commodityWeight, commodityUnit, vipDiscount, promotion, goodsDesc) {
    return ax.get('/addCommodity', { params: { category, barCode, name, salePrice, marketPrice, stockPrice, stockCount, commodityWeight, commodityUnit, vipDiscount, promotion, goodsDesc } })
}

//商品搜索显示
export function commoditySearch(page, pagecell, searchName, searchCategory) {
    return ax.get('/commoditySearch', {params: { page, pagecell,searchName,searchCategory}})
}
//删除商品
export function commodityRemove(id){
    return ax.get('/commodityRemove',{params:{id}})
}
//商品修改
export function commodityUpdate(formData) {
    return ax.get('/commodityUpdate', {
        params: formData
    })
}