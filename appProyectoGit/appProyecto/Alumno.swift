//
//  Alumno.swift
//  appProyecto
//
//  Created by Alessandro Tolentino Hernandez on 21/10/22.
//

import UIKit

class Alumno: Codable {
    var ident: String
    var matricula: String
    var nombre: String
    var correoInstitucional: String
    var password: String
    var campus: String
    
    init(ident: String, matricula: String, nombre: String, correoInstitucional: String, password: String, campus: String) {
        self.ident = ident
        self.matricula = matricula
        self.nombre = nombre
        self.correoInstitucional = correoInstitucional
        self.password = password
        self.campus = campus
    }
    
}
