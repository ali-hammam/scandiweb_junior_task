const AttributeComponent = ({ attribute, attributeValues, setAttributeValues }) => {
  const toKebabCase = (str) => {
    return str
      .replace(/[_\s]+/g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '')
  };
  
  const renderColorAttribute = (attribute) => {

    const selectedColor = attributeValues[attribute.name.toLowerCase()];
    return (
      <div data-testid={toKebabCase('product-attribute-color')}>
        {
          attribute.items.map(color => (
            <button
              key={color}
              className="btn"
              style={{
                backgroundColor: color.value,
                width: '40px',
                height: '40px',
                border: selectedColor === color.value ? '2px solid black' : '1px solid #ccc',
                marginRight: '5px'
              }}
              onClick={() => setAttributeValues({...attributeValues, color: color.value})}
              data-testid={selectedColor === color.value ? 
                'product-attribute-color-' + color.displayValue + '-selected'
                :
                'product-attribute-color-' + color.displayValue
              }
            />
          ))
        }
      </div>
    );
  }

  const renderAttributes = (attribute) => {
    const selectedAttribute = attributeValues[attribute.name.toLowerCase()];
    return (
      <>
        {
          <div className="btn-group" data-testid={toKebabCase('product-attribute-' + attribute.name.toLowerCase()) }>
          {attribute.items.map(item => (
              <button 
                style={{
                  backgroundColor: selectedAttribute === item.value ? 'black' :'#ffffff',
                  color: selectedAttribute === item.value ? '#ffffff' :'black',
                  width: 'auto',
                  height: '40px',
                  border: '2px solid black',
                  marginRight: '5px'
                }}
                name={attribute.name} 
                className="btn btn-light"
                autoComplete="off" 
                value={item.value}
                onClick={() => setAttributeValues({
                  ...attributeValues,
                  [attribute.name.toLowerCase()]: item.value
                })}
                readOnly
                data-testid={
                  selectedAttribute === item.value ?
                  `product-attribute-${toKebabCase(attribute.name.toLowerCase())}-${toKebabCase(item.value)}-selected`
                  :`product-attribute-${toKebabCase(attribute.name.toLowerCase())}-${toKebabCase(item.value)}`
                }
              >
                {item.value}
              </button>
          ))}
        </div>
        }
      </>
    );
  }

  return (
    <div className="form-group">
      <label><strong>{attribute.name.toUpperCase()}</strong></label><br />
      <div className="btn-group">
        { attribute.name.toLowerCase() === 'color' ? renderColorAttribute(attribute): renderAttributes(attribute) }
      </div>
    </div>
  )
}

export default AttributeComponent;