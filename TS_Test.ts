interface  Employee {
    uniqueId: number;
    name: string;
    subordinates: Employee[];
}

interface IEmployeeOrgApp{
    ceo: Employee
}

class EmployeeOrgApp implements IEmployeeOrgApp{
    
    ceo: Employee;
    movingSub: Employee = {
        uniqueId: 0,
        name: "",
        subordinates: []
    };

    previousSupervisor: Number = 0;
    newHierarchy:any

    employeeID: number = 0;
    supervisorID: number = 0;

    isUndone:boolean = false;
    isRedo:boolean = false;

    constructor(ceo: Employee){
        this.ceo = ceo;
    }

    move(employeeID: number, supervisorID: number){

        if(employeeID === supervisorID){
            return console.log('employeeID and supervisorID cannot be same');
        }

        this.employeeID = employeeID;
        this.supervisorID = supervisorID;
    
        // Loop recursively to remove an employee from a supervisor
        this.movingEmployee(this.ceo.subordinates, 'remove');
        // Loop recursively to add an employee to a supervisor
        this.movingEmployee(this.ceo.subordinates, 'add');

        if(!this.isRedo){
            console.log("move: ",this.ceo);
        }

    }

    movingEmployee(subordinates: Employee[], action: string){
        //subordinates.forEach((sub, index) => {
        for(let sb = 0 ; sb < subordinates.length; sb++){
            if(action === 'remove'){
                if(this.previousSupervisor === 0){
                    // Identify and set supervisor of the employee
                    this.setPreviousSupervisor(subordinates[sb]);
                }
                if( subordinates[sb].uniqueId === this.employeeID){
                    this.removeEmployee(subordinates, subordinates[sb], sb);
                    break;
                }else{
                    this.movingEmployee(subordinates[sb].subordinates, action);
                }
            }else if(action === 'add'){
                if(subordinates[sb].uniqueId === this.supervisorID){
                    this.addEmployee(subordinates[sb]);
                    break;
                }else{
                    this.movingEmployee(subordinates[sb].subordinates, action);
                }
            }else if(action === 'undoEmployeeFromNewSupervisor'){
                if(subordinates[sb].uniqueId === this.employeeID){
                    // Removing employee previously added to new supervisor
                    subordinates.splice(sb, 1);
                }else if(subordinates[sb].uniqueId === this.newHierarchy.uniqueId){
                    
                    // Removing newHierarchy created out of employee
                    subordinates.splice(sb, 1);
                    
                }else{
                    this.movingEmployee(subordinates[sb].subordinates, action);
                }
            }else if(action === 'undoEmployeeToPreviousSupervisor'){
                if(subordinates[sb].uniqueId === this.previousSupervisor){
                    // Adding employee to previousSupervisor
                    this.movingSub.subordinates.unshift(this.newHierarchy);
                    subordinates[sb].subordinates.push(this.movingSub);
                    break;

                }else{
                    this.movingEmployee(subordinates[sb].subordinates, action);
                }
            }
            
        };
    }

    removeEmployee(subordinates:Employee[], sub:Employee, index: number){
        
        // Subordinates belonged to the employee 
        this.newHierarchy = sub.subordinates[0];
        
        // Removing the employee
        subordinates.splice(index, 1);
        
        // Shifting Subordinates of the employee to upper level
        subordinates.push(this.newHierarchy);

        // Saving the employee to be added under new supervisor
        this.movingSub = {
            uniqueId: sub.uniqueId,
            name: sub.name,
            // Adding back other subordinates of the employee
            subordinates: sub.subordinates
            .filter(s => this.newHierarchy.uniqueId !== s.uniqueId)
        }
    }

    setPreviousSupervisor(sub: Employee){
        for(let i = 0 ; i < sub.subordinates.length; i++){
            if(sub.subordinates[i].uniqueId === this.employeeID){
                this.previousSupervisor = sub.uniqueId;
                break;
            }
        }
    }

    addEmployee(sub: Employee){
        // Adding employee to new supervisor
        sub.subordinates.push(this.movingSub);
    }

    undo(){

        if(this.previousSupervisor === 0){
            return console.log("Undo can be done after Move action");
        }

        this.movingEmployee(this.ceo.subordinates, 'undoEmployeeFromNewSupervisor');
        this.movingEmployee(this.ceo.subordinates, 'undoEmployeeToPreviousSupervisor');
        this.isUndone = true;
        console.log("undo: ", this.ceo);
    }

    redo(){

        if(!this.isUndone){
            return console.log('Redo can be done after Undo action');
        }

        this.isRedo = true;

        this.move(this.employeeID, this.supervisorID);

        console.log("redo: ",this.ceo);
        
    }

}

const ceo: Employee = {
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

const app = new EmployeeOrgApp(ceo);

app.move(5, 14); // employeeID: Bob Saget & supervisorID: Georgina Flangy
app.undo();
app.redo();