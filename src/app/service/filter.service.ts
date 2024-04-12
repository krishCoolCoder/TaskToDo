import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }
  organisationId : string | null= null;
  teamId : string | null = null;
  projectId : string | null = null;
  setOrganisationId (organisationId : string) {
    this.organisationId = organisationId;
  }
  setTeamId (teamId : string) {
    this.teamId = teamId
  }
  setProjectId ( projectId : string ) {
    this.projectId = projectId
  }
  getOrganisationId(){
    return this.organisationId;
  }
  getTeamId() {
    return this.teamId;
  }
  getProjectId() {
    return this.projectId;
  }
  getAllHeaderFilter() {
    return {
      organisationId : this.organisationId,
      teamId : this.teamId,
      projectId : this.projectId
    }
  }
  isHeaderFilterEmpty () {
    return (this.organisationId === "" && this.teamId === "" && this.projectId === "")
  }
}
