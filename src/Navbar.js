import "./navStyles.css"

function Navbar(){
    return <nav className="navBar">
        <ul>
            <li>
              <a href= "/">Home</a>
            </li>
            <li>
              <a href= "/login">Log in</a>
            </li>
            <li>
              <a href="/signup">Sign up</a>
            </li>
            <li>
              <a href="/CreateProject">Create Project</a> 
            </li>
            <li>
              <a href="/CreateTeam">Create Team</a>
            </li>
            <li>
              <a href="/ViewProjects">View Projects</a>
            </li>
            <li>
              <a href="/ViewTeams">View All Teams</a>
            </li>
            <li>
              <a href="/CreateTeamRoster">Create Team Roster</a>
            </li>
            <li>
              <a href="/CreateUserStory">Create User Story</a>
            </li>
        </ul>
    </nav>
}

export default Navbar