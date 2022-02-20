class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {};
    const category = this.queryStr.category
      ? {
          category: {
            $regex: this.queryStr.category,
            $options: 'i',
          },
        }
      : {};

    const query = { ...category, ...keyword };

    this.query = this.query.find({ ...query });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // Removing fields from the query
    const removeFields = ['keyword', 'limit', 'page', 'sort'];
    removeFields.forEach((el) => delete queryCopy[el]);

    // Advance filter for price, ratings etc
    let queryDB = JSON.stringify(queryCopy);
    queryDB = queryDB.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryDB));
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      //for multiple sorting condition
      const sortQuery = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortQuery);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  pagination(resPerPage) {
    //resPerPage means number of product on the page
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
