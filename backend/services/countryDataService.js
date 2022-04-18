const db = require('./db')
const helper = require('../helper')
const config = require('../config')

async function getCountries(page, searchString, columnName, order, listPerPage){
    const offset = helper.getOffset(page, listPerPage)
    let rows;
    let totalRow;
    if(searchString === ""){
        rows = await db.query(
            `SELECT ID, COUNTRY_NAME, CAPITAL, TIMEZONE FROM COUNTRY_DATA  ORDER BY ${columnName} ${order}
            LIMIT ${offset},${listPerPage}`
        )
        totalRow = await db.query(
            `SELECT count(ID) FROM COUNTRY_DATA`
        )
    }else{
        rows = await db.query(
            `SELECT ID, COUNTRY_NAME, CAPITAL, TIMEZONE FROM COUNTRY_DATA WHERE COUNTRY_NAME LIKE lower(concat('${searchString}','%'))
            ORDER BY ${columnName} ${order}`
        )
        totalRow = await db.query(
            `SELECT count(ID) FROM COUNTRY_DATA WHERE COUNTRY_NAME LIKE lower(concat('${searchString}','%'))`
        )
    }
    
    const totalRows = totalRow[0]["count(ID)"]
    const totalPages = Math.ceil(totalRows/listPerPage)

    const data = helper.emptyOrRows(rows)
    const meta = {page, listPerPage, totalRows, totalPages}

    return {data, ...meta}
}

module.exports = {getCountries}
