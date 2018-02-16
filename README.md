# Better Doctor API
Week 2 of JavaScript API project.

## About Better Doctor API
Using the [BetterDoctor API](https://developer.betterdoctor.com/), you can enter your symptoms to get a list of medical experts that can treat the listed symptoms.

### Setup
```
$ git clone https://github.com/thebyronc/betterdoctor-api.git

```

### Behavior Driven Specifications
- A user should be able to enter a medical issue to receive a list of doctors in the Portland area that fit the search query.
- A user should be able to to enter a name to receive a list of doctors in the Portland area that fit the search query.
- If the query response includes any doctors, the following information should be included about each doctor: first name, last name, address, phone number, website and whether or not the doctor is accepting new patients (the API provides this data).
- If the API call results in an error (any message not a 200 OK), the application should return a notification that states what the error is.
- If the query response doesn't include any doctors (for instance, if no doctors meet the search criteria), the application should return a notification that states that no doctors meet the criteria. (This is not an error so it should be handled separately from any errors.)
