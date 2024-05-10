function paramsToObject(entries:any) {
    interface IResult {
        [key: string|number]:any
    }

    let result: IResult;
    // eslint-disable-next-line prefer-const
    result = {};
    for(const [key, value] of entries) { // each 'entry' is a [key, value] tupple
      result[key] = value;
    }
    return result;
  }

  export default paramsToObject