export class student_profile {
    full_name : {
        "first_name" :string,
        "last_name" :string
    };
    user_name :string;
    gender :string;
    age :number;
    address :{
        "country" :string,
        "state" :string,
        "locality" :string
    }
    qualification :string;
    email :string;
    contact_number :number;
    image_url :string;

    constructor (full_name :{"first_name" :string,"last_name" :string},
                 user_name :string,
                 gender :string,
                 age :number,
                 address :{"country" :string,"state" :string,"locality" :string},
                 qulaification :string,
                 email :string,
                 contact_number :number,
                 image_url :string){
        this.full_name ={
            "first_name" : full_name.first_name,
            "last_name" :full_name.last_name
        };
        this.user_name = user_name;
        this.gender = gender;
        this.age = age;
        this.address = {
            "country" : address.country,
            "state" : address.state,
            "locality" : address.locality
        };
        this.qualification = qulaification;
        this.email = email;
        this.contact_number = contact_number;
        this.image_url = image_url;

    }
}