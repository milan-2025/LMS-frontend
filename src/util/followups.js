export const setTopFollowUPIds = (ids) => {
  localStorage.setItem(
    "ids",
    JSON.stringify({
      ids: ids,
    })
  )
}

export const getStoredFollowUpIds = () => {
  if (localStorage.getItem("ids")) {
    const { ids } = JSON.parse(localStorage.getItem("ids"))
    return ids
  }
  return []
}

export const chkAndReplaceFollowUpIds = (id) => {
  let ids = getStoredFollowUpIds()
  console.log("ids in chk", ids)
  console.log("ids in chk2", id)

  // let { token } = JSON.parse(localStorage.getItem('token'))
  if (ids.includes(id)) {
    let index = ids.findIndex((item) => {
      return item == id
    })
    let spliced = ids.splice(index, 1)
    console.log(`id:- ${id}, spliced array ${spliced}, ids:- ${ids}`)
    setTopFollowUPIds(ids)
  }
}
