export const decodeWSMessage = (data:any) => {
    if (!data ) {
      return {
          type:'noop'
      }
    }
    var payload = JSON.parse(data.data);
    return {...payload}
}