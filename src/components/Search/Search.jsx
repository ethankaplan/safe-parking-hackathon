import React, {Component} from 'react'



// PASS IT A METHOD THAT TAKES VALUE AND DOES SOMETHING WITH IT IN PARENT COMPONENT
class Search extends Component{
    state = {
        search:''
      
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({[e.currentTarget.name]: e.currentTarget.value});
      
    }

    handleSubmit = (e)=>{
        e.preventDefault()
        this.props.searching(this.state.search)

        
    }

  render(){
      const { search } = this.state
      console.log(search, "from search")
      return(
          <div>
            <form onSubmit={(e)=>this.handleSubmit(e)}> 
                <input type='text' name="search" placeholder="search" 
                value={search} onChange={(e)=>this.handleChange(e)} autoComplete="off" style={{height:"200px"}}/>
                <button type="submit"> Submit</button>
            </form>
          </div>
      )

  }



}

export default Search