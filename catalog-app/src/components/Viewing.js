import React from 'react';
import {observer} from 'mobx-react'

function Viewing({store}) {
  return (
    <div>
      {store.catalogCount}
      <br></br>List:
      {store.catalogList}
    </div>
  )
}

export default observer(Viewing);