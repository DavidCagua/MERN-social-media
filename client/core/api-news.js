const list = async (signal) => {
    try {
        let response = await fetch('https://content.guardianapis.com/search?&show-fields=trailText,thumbnail&api-key=8f1e538c-adfd-410f-95bd-fef18e34d6e7', {
          method: 'GET',
          signal: signal,
        })
        return await response.json()
      } catch(err) {
        console.log(err)
      }
  }

  export {list}