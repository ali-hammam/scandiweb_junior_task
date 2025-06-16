const AttributeComponent = ({ attribute, attributeValues, setAttributeValues }) => {
  const toKebabCase = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }
  
  const renderColorAttribute = (attribute) => {

    const selectedColor = attributeValues[attribute.name.toLowerCase()];
    return (
      <div data-testid={toKebabCase('product-attribute-Color')}>
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
              data-testid={toKebabCase('product-attribute-Color-' + color.value)}
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
          <div className="btn-group" data-testid={toKebabCase('product-attribute-' + attribute.name) }>
          {attribute.items.map(item => (
            <label
              key={item.value}
              className={`btn btn-default ${selectedAttribute === item.value ? 'active' : ''}`}
            >
              <input 
                type="radio"
                name={attribute.name} 
                autoComplete="off" 
                value={item.value}
                checked={selectedAttribute === item.value}
                onChange={() => setAttributeValues({
                  ...attributeValues,
                  [attribute.name.toLowerCase()]: item.value
                })}
                readOnly
                style={{ display: 'none' }}
                data-testid={toKebabCase('product-attribute-' + attribute.name + '-' + item.value)}
              />
              {item.value}
            </label>
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