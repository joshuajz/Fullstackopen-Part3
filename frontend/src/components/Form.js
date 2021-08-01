import React from 'react'

const NumberForm = ({name, onName, number, onNumber, onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
        <div>
          Name: <input value={name} onChange={onName}/>
        </div>
        <div>
          Phone Number: <input value={number} onChange={onNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default NumberForm
