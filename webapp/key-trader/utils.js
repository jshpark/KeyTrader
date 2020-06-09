// async/await error catcher
const catchAsyncErrors = fn => (
    (req, res, next) => {
      const routePromise = fn(req, res, next);
      if (routePromise.catch) {
        //console.log(req);
        //console.log('blahblahblah ');
        routePromise.catch(err => next(err));
      }
    }
  );

  exports.catchAsync = catchAsyncErrors;
