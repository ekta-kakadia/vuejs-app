module.exports = mongoose => {

 const schema =  mongoose.Schema(
    {
      name: String,
      category: String,
      image: String,
      price: String, 
      discount: String,
      net_price: String,
      description: String
    },
    { timestamps: true }
  );
  schema.method("toJSON", function() {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

    const Products = mongoose.model(
      "products",
    schema
    );

    return Products;
  };