// Only perform once-only setup for Unit Test environment.
if(!process.env.BASE_PATH) {
  process.env.BASE_PATH = 'foo.bar.com';
  process.env.API_KEY = 'beans-on-toast';  
}

jest.spyOn(console, 'log').mockImplementation(() => {});
