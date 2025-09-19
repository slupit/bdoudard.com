# -*- coding: utf-8 -*-
"""
Created on Sat Mar 23 19:13:50 2024

@author: slupi
"""

from ortools.linear_solver import pywraplp
import numpy as np
import matplotlib.pyplot as plt

import geopandas as gpd
import pandas as pd
import os, sys

    
def main():
    #Data
    customer = ["Akron", "Albany", "Nashua", "Scranton", "Utica"]
    # cust_coord = [[-81.5219, -73.7987, -71.491, -75.6649, -75.2261], [41.0798, 42.6664, 42.7491, 41.4044, 43.0962]] 
    cust_coord = [[1.51e6, 2.11e6, 2.27e6, 2e6, 2e6],[-0.26e6, 87e3, 1.56e5, -1e5, 1e5]]
    factory = ["Bethlehem", "Pittsburgh", "Rochester", "Springfield"]
    # fact_coord = [[-75.3679, -79.9763, -77.6162, -72.5395], [40.6266, 40.4397, 43.168, 42.1155]]
    fact_coord = [[2e6, 1.65e6, 1.79e6, 2.212e6],[-1.7e5, -3e5, 5e4, 5.5e4]]
    demand = [1200000, 1150000, 1350000, 1800000, 900000]
    fixed_cost = [4000000, 7500000, 4500000, 5200000]
    capacity = [3300000, 4800000, 4200000, 3750000]
    transportation_cost = [[2.2, 1.8, 2.7, 3.8], [1.6, 3.2, 1.2, 0.6], [3.2, 4., 2.5, 0.7], [0.8, 2.1, 1.4, 1.3], [1.6, 2.4, 0.7, 1.5]]
    I = len(customer)
    J = len(factory)
    # I = Customers
    # J = Facility
    
    # Solver
    # Create the mip solver with the SCIP backend.
    solver = pywraplp.Solver.CreateSolver("SCIP")
    
    if not solver:
        return
    
    # Variables
    X = {}
    for j in range(J):
        X[j] = solver.IntVar(0., 1., "")
    
    Y = {}
    for i in range(I):
        for j in range(J):
            Y[i, j] = solver.NumVar(0., 1., "")
            
            
    # Constraints.
    for i in range(I):
        solver.Add(solver.Sum([Y[i, j] for j in range(J)]) == 1)
    
    for j in range(J):
        for i in range(I):
            solver.Add(0 <= Y[i, j] <= X[j])
    for j in range(J):
        solver.Add(solver.Sum([Y[i, j]*demand[i] for i in range(I)]) <= capacity[j])
        
    # Objective
    objective_terms = []
    for j in range(J):
        objective_terms.append(fixed_cost[j]*X[j])
        for i in range(I):
            objective_terms.append(demand[i]*transportation_cost[i][j]*Y[i, j])
    solver.Minimize(solver.Sum(objective_terms))
    
    # Solve
    print(f"Solving with {solver.SolverVersion()}")
    status = solver.Solve()
    
    # Print solution.
    if status == pywraplp.Solver.OPTIMAL or status == pywraplp.Solver.FEASIBLE:
        print(f"\n>Total cost = ${solver.Objective().Value()/10**6}M\n")
        for j in range(J):
            if X[j].solution_value() > 0.5:
                print(f">{factory[j]} facility is open\n")
        for i in range(I):
            for j in range(J):
                # Test if x[i,j] is 1 (with tolerance for floating point arithmetic).
                if Y[i, j].solution_value() > 0 and demand[i]*Y[i, j].solution_value() > 1:
                    print(f">{customer[i]} has {demand[i]*Y[i, j].solution_value()/10**6}M items delivered from {factory[j]}.\n" )
    else:
        print("No solution found.")
            
    
    marker, color, dpi = ['o', 'o', '-'], ['b', 'r', 'black','green'], 150
    
    # filename = wget.download("https://www.ers.usda.gov/media/rbmpu1zi/mapdata2021.xlsx")
    df = pd.read_excel(os.getcwd()+'/mapdata2021.xlsx',skiprows=4)
    df = df.rename(columns={'Unnamed: 0':'state',
                           'Percent':'pct_food_insecure'})
    df = df[['state','pct_food_insecure']]
    df = df[df.state.str.len()==2]

    # wget.download("https://www2.census.gov/geo/tiger/GENZ2018/shp/cb_2018_us_state_500k.zip")
    gdf = gpd.read_file(os.getcwd()+'/cb_2018_us_state_500k')
    gdf = gdf.merge(df,left_on='STUSPS',right_on='state')

    visframe = gdf.to_crs({'init':'epsg:2163'})
    # create figure and axes for with Matplotlib for main map
    fig, ax = plt.subplots(1, figsize=(18, 12), dpi=dpi)
    # remove the axis box from the main map
    ax.axis('off')
    # create map of all states except AK and HI in the main map axis
    visframe[~visframe.state.isin(['HI','AK'])].plot(color='white', linewidth=1, ax=ax, edgecolor='0.4')
    
    ax.scatter(cust_coord[0], cust_coord[1], color= color[0], marker= marker[0])#, label="Customer")
    for i in range(I):
        ax.text(cust_coord[0][i], cust_coord[1][i]+1e4, customer[i], fontdict={'fontsize' : 15})
        
    
    for j in range(J):
        ax.text(fact_coord[0][j], fact_coord[1][j]+1e4, factory[j], fontdict={'fontsize' : 15})
        if X[j].solution_value() > 0.5:
            ax.scatter(fact_coord[0][j], fact_coord[1][j], color= color[3], marker= marker[1])#, label="Factory open")
        else:
            ax.scatter(fact_coord[0][j], fact_coord[1][j], color= color[1], marker= marker[1])#, label="Factory closed")
            
    for j in range(J):
        for i in range(I):
            if Y[i, j].solution_value() > 0.5:
                ax.plot([fact_coord[0][j],cust_coord[0][i]], [fact_coord[1][j],cust_coord[1][i]], color= color[2])
       

    plt.title('Map of customers & facilities', fontdict={'fontsize' : 25})  
    ax.set_xlim(1.4e6,2.5e6)
    ax.set_ylim(-0.4e6,0.25e6)
    ax.legend(["Customer","Factory open","Factory closed"], fontsize = 18, loc = 'lower right')
    
    # Save the plot
    plt.savefig('8_19_plot_new.png', dpi=150, bbox_inches='tight')
    plt.show()

    
if __name__ == "__main__":
    main()




