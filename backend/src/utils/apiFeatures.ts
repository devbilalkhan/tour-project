//class API
import { Request } from "express";
//Return this is used to we can chain the APIFeatures instance with multiple methods

class APIFeatures {
  constructor(public query: any, public queryString: any) {}

  //removes the sort, page, limit, fields keyword
  //adds $ sign to the relational operators
  filter(): this {
    const getQuery = { ...this.queryString };
    const excludeFields = ["sort", "page", "limit", "fields"];
    excludeFields.forEach((field: string) => delete getQuery[field]);

    const queryStr = JSON.stringify(getQuery);

    const updatedQuery = JSON.parse(
      queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    );
    this.query.find(updatedQuery);
    return this;
  }

  //sorts based on the fields given, can do sort based on multiple fields.
  //for example : sort=-price,-ratingsAverage
  sort(): this {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  //selective fields filter
  //for example : fields=price,duration,ratingsAverage
  limitFields(): this {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  // pagination page=3&limit=10
  paginate(): this {
    let page = 1;
    if (this.queryString.page) {
      page = +this.queryString.page;
    }

    let limit = 10;
    if (this.queryString.limit) {
      limit = +this.queryString.limit;
    }
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
export default APIFeatures;
