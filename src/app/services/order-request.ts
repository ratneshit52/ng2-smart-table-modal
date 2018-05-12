export class OrderRequest {
    public userName: string;
    public firstName: string;
    public lastName: string;
    public userRole: string;
    public stations: string;
    constructor(userName: string, firstName: string, lastName: string, userRole: string, stations: string) {
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userRole = userRole;
        this.stations = stations;
    }
}
