import React from 'react';
import {
  Card, CardBody, Col, ButtonToolbar,
} from 'reactstrap';
import HeartIcon from 'mdi-react/HeartIcon';
import StarIcon from 'mdi-react/StarIcon';
import StarOutlineIcon from 'mdi-react/StarOutlineIcon';
import { Link } from 'react-router-dom';
import ProductGallery from './ProductGallery';
import images from './imgs';
import ProductTabs from './ProductTabs';
import ColorSelect from './ColorSelect';

const ProductCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="product-card">
          <ProductGallery images={images} />
          <div className="product-card__info">
            <h3 className="product-card__title">Naon 3000</h3>
            <div className="product-card__rate">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarOutlineIcon />
              <a className="product-card__link" href="/easydev/e-commerce/product_page">See all reviews</a>
            </div>
            <h1 className="product-card__price">$1000 <span className="product-card__old-price">$800</span></h1>
            <p className="typography-message">
            Hermoso monoambiente super luminoso con balcón al frente / entre jaramillo y balbin
             excelente ubicación / a pocas cuadras de la estación luis maria saavedra
              monoambiente al frente/ balcón / hermosa vista / cocina semi integrada / baño completo
               38 m2 totales / sum / piso alto / se muestra a partir de agosto .
            </p>
            <form className="form product-card__form">
              <div className="form__form-group">
                <span className="form__form-group-label product-card__form-label">Select Color</span>
                <div className="form__form-group-field">
                  <ColorSelect options={[
                    { value: 'Pink Sugar', label: 'Pink Sugar', color: '#f7a9c4' },
                    { value: 'Pink Sugar', label: 'Pink Sugar', color: '#f7a9c4' },
                    { value: 'Pink Sugar', label: 'Pink Sugar', color: '#f7a9c4' },
                  ]}
                  />
                </div>
              </div>
              <ButtonToolbar className="product-card__btn-toolbar">
                <Link className="btn btn-primary" to="/e-commerce/cart">Add to cart</Link>
                <button className="product-card__wish-btn" type="button"><HeartIcon />Add to wishlist</button>
              </ButtonToolbar>
            </form>
            <ProductTabs />
          </div>
        </div>
      </CardBody>
    </Card>
  </Col>
);

export default ProductCard;
