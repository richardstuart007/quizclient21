//
//  Libraries
//
import axios from 'axios'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
//
// methods - post(get), post(update), delete(delete), put(upsert)
//
export default async function apiAxios(method, url, data) {
  try {
    if (debugLog) console.log(`url(${url}) method(${method})`)
    const response = await axios({
      method: method,
      url: url,
      data: data
    })
    if (debugLog) console.log(response)
    //
    //  Errors
    //
    if (response.status !== 200) throw Error('Did not receive expected data')
    //
    //  Return rows
    //
    return response.data
    //
    //  Catch Error
    //
  } catch (err) {
    const message = err.response.data
    console.log(message)
    console.log(err)
    return null
  }
}
