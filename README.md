# Organization Chart Test
In this test we have Created a Concrete class called EmployeeOrgApp which implements IEmployeeOrgApp. The logic inside the class fully dependent on the structure that is defined below description.Once we will call `move` method only after that `undo` can be invoked like the way we usually do in our developer life redo and undo things.This solution supports one step redo undo not on nth level, Similer logic can build on top the existing solution.

## Project setup
```
Normal typescript project environment setup then we are good to go to test the class
```

### Used following static chart structure values that can be changed based on the needs
```
{
        uniqueId: 1,
        name: 'Mark Zuckerberg',
        subordinates: [
        {
            uniqueId: 2,
            name: 'Sarah Donald',
            subordinates: [
                {
                    uniqueId: 3,
                    name: 'Cassandra Reynolds',
                    subordinates: [
                        {
                            uniqueId: 4,
                            name: 'Mary Blue',
                            subordinates: [
                                
                            ]
                            
                        },
                        {
                            uniqueId: 5,
                            name: 'Bob Saget',
                            subordinates: [
                                {
                                    uniqueId: 6,
                                    name: 'Tina Teff',
                                    subordinates: [
                                        {
                                            uniqueId: 7,
                                            name: 'Will Turner',
                                            subordinates: [
                                                
                                            ]
                                        },
                                    ]
                                },
                            ]
                            
                        },
                    ]
                    
                },
            ]
            
        },
        {
            uniqueId: 8,
            name: 'Tyler Simpson',
            subordinates: [
                {
                    uniqueId: 9,
                    name: 'Harry Tobs',
                    subordinates: [
                        {
                            uniqueId: 10,
                            name: 'Thomas Brown',
                            subordinates: []
                        },
                    ]
                },
                {
                    uniqueId: 11,
                    name: 'George Carrey',
                    subordinates: []
                },
                {
                    uniqueId: 12,
                    name: 'Gary Styles',
                    subordinates: []
                },
            ]
        },
        {
            uniqueId: 13,
            name: 'Bruce Willis',
            subordinates: []
        },
        {
            uniqueId: 14,
            name: 'Georgina Flangy',
            subordinates: [
            {
                    uniqueId: 15,
                    name: 'Sophie Turner',
                    subordinates: []
                }, 
            ]
        },
        ]
    }
```

### Run Test 
```
app.move(5, 14); // employeeID: Bob Saget & supervisorID: Georgina Flangy
app.undo();
app.redo();
```
