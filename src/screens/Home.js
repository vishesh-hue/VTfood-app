import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Foot from '../components/Foot';
import Carousel from '../components/Carousel';

export default function Home() {
  const [foodcat, setFoodcat] = useState([]);
  const [fooditm, setFooditm] = useState([]);
  const [search , setSearch] = useState('')

  const loadData = async () => {
    try {
      let response = await fetch('http://localhost:5000/api/foodlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      response = await response.json();
      setFooditm(response[0]);
      setFoodcat(response[1]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: '10' }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                {/*<button className="btn btn-outline-success" type="submit">*/}
                  
                
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?pasta"
                className="d-block w-100"
                style={{ filter: 'brightness(30%)' }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100"
                style={{ filter: 'brightness(30%)' }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?ramen"
                className="d-block w-100"
                style={{ filter: 'brightness(30%)' }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pizza"
                className="d-block w-100"
                style={{ filter: 'brightness(30%)' }}
                alt="..."
              />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {
          foodcat !== [] ?
            foodcat.map((data) => {
              return (<div className='row mb-3'>
                <div key={data._id} className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr />
                {
                  fooditm !== []
                    ?
                    fooditm.filter((itm) => (itm.CategoryName === data.CategoryName) && (itm.name.toLowerCase().includes(search.toLocaleLowerCase())))
                      .map(itmfilter => {
                        return (
                          <div key={itmfilter._id} className='col-12 col-md-6 col-lg-3'>
                            <Card  fooditm ={itmfilter}
                            options ={itmfilter.options[0]}
                            
                            
                            
                            
                            ></Card> 
                          </div>
                        )
                      })
                    :
                    <div>no such data</div>}
              </div>
              )
            })
            :
            <div>no</div>
        }
      </div>

      <div>
        <Foot />
      </div>
    </>
  );
}
