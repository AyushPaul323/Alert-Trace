import { request, gql } from 'graphql-request'

const MASTER_URL="https://api-ap-south-1.hygraph.com/v2/clt3cy7mg25uc07we1yy36u9q/master"

const getSlider=async()=>{
    const query = gql`
    query MyQuery {
        sliders {
          id
          name
          image {
            url
          }
        }
      }
`
const result=await request(MASTER_URL, query);
return result;
}
const getCategories=async()=>{
  const query = gql`
  query GetCategory {
    categories {
      id
      name
      icon {
        url
      }
    }
  }
  `
  const result=await request(MASTER_URL, query);
  return result;
}

const getBusinessList=async()=>{
  const query = gql`
  query getBusinessList {
    businessLists {
      id
      name
      image {
        url
      }
      about
    }
  }
  
  
  `
  const result=await request(MASTER_URL, query);
  return result;
}


export default{
    getSlider,
    getCategories,
    getBusinessList
} 
